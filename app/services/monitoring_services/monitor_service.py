from app.models.device import Device
from app.models.device_status import DeviceStatus
from app.models.monitor_log import MonitorLog
from app.models.user import User
from app.services.monitoring_services.ping_check_service import PingCheck
from app.services.monitoring_services.port_check_service import PortCheck
from app.services.monitoring_services.snmp_check_service import SNMPCheck
from app import db
from datetime import datetime, timedelta
import json
import logging
logger = logging.getLogger("flask")

class MonitorDevice:
    @staticmethod
    def update_data(ping_response,port_check_status,snmp_response,device):
        log = MonitorLog(
            device_id=device.id,
            user_id=device.user_id,
            device_name=device.name,
            ip_address=device.ip_address,
            serial_number=device.serial_number,
            device_type=device.device_type,

            ping_average_response_time = ping_response.get("ping_avg"),
            ping_max_response_time = ping_response.get("ping_max"),
            ping_min_response_time = ping_response.get("ping_min"),
            ping_packet_loss = ping_response.get("packet_loss"),
            ping_status = ping_response.get("ping_status"),

            port_status = port_check_status,

            cpu_load = snmp_response.get('cpu_load'),
            cpu_model = snmp_response.get('cpu_model'),
            cpu_cores = snmp_response.get('cpu_cores'),
            cpu_freq = snmp_response.get('cpu_freq'),
            cpu_status=snmp_response.get('cpu_status'),

            memmory_total=snmp_response.get('memmory_total'),
            memmory_used=snmp_response.get('memmory_used'),
            memory_free=snmp_response.get('memory_free'),
            memory_available=snmp_response.get('memory_available'),
            memory_status=snmp_response.get('memory_status'),

            disk_total=snmp_response.get('disk_total'),
            disk_used=snmp_response.get('disk_used'),
            disk_available=snmp_response.get('disk_available'),
            disk_usage_percent=snmp_response.get('disk_usage_percent'),
            disk_status=snmp_response.get('disk_status'),

            network_received=snmp_response.get('network_received'),
            network_transmitted=snmp_response.get('network_transmitted'),

            checked_at=datetime.utcnow() + timedelta(hours=3)
        )

        if log:
            db.session.add(log)
            db.session.commit()



    @staticmethod
    def check_device(device_id):
        device = Device.query.get(device_id)
        ping_response = {'packet_loss':None, 'ping_avg':None, 'ping_min':None, 'ping_max':None,'ping_status':'Недоступно'}
        port_check_status = None
        snmp_response = {'cpu_load': None,'cpu_model':None,'cpu_cores':None,'cpu_freq':None, 'cpu_status': None, 'memmory_total': None, 'memmory_used': None, 'memory_free': None, 'memory_available': None, 'memory_status': None, 'disk_total': None, 'disk_used': None, 'disk_available': None, 'disk_usage_percent': None, 'disk_status': None, 'network_received': None, 'network_transmitted': None}
        response = None
        if not device:
            return
        try:
            if "ping" in device.type_check:
                ping_response = PingCheck.diagnostics(device.ip_address, 10)
                respones = 1
            if "port" in device.type_check:
                ports = []
                raw_ports = device.port.strip('"') 
                ports = [int(p) for p in raw_ports.split(",") if p.strip().isdigit() and 0 < int(p.strip()) <= 65535]
                port_response = PortCheck.start_port_check(device.ip_address,ports)
                if port_response is not None:
                    port_check_status = json.dumps(port_response, ensure_ascii=False)
                    response = 1
                if port_response is None:
                    port_check_status = "недоступен"
            if "snmp" in device.type_check:
                snmp_response = SNMPCheck.start_snmp_check(device.ip_address,device.device_login,device.get_password())
                response = 1
        except Exception as e:
            response = None

        if respones != None:
            MonitorDevice.update_data(ping_response,port_check_status,snmp_response,device)

