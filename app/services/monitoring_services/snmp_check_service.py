from flask import current_app

import paramiko
import re
import logging

logger = logging.getLogger("flask")

class SNMPCheck:
    @staticmethod
    def get_sysinfo_ssh_with_password(host, username, password):
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname=host, username=username, password=password)

        # Нагрузка CPU
        stdin, stdout, stderr = ssh.exec_command("top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'")
        output = stdout.read().decode().strip().replace(',', '.') 
        cpu_load = float(output) 

        # модель CPU
        stdin, stdout, stderr = ssh.exec_command("cat /proc/cpuinfo | grep 'model name' | uniq")
        cpu_model = stdout.read().decode().strip().split(":")[-1].strip()

        # ядра CPU
        stdin, stdout, stderr = ssh.exec_command("nproc")
        cpu_cores = int(stdout.read().decode().strip())

        # частота CPU
        stdin, stdout, stderr = ssh.exec_command("cat /proc/cpuinfo | grep 'cpu MHz' | uniq")
        cpu_freq = stdout.read().decode().strip().split(":")[-1].strip() + "MHz"

        # Оперативная память
        stdin, stdout, stderr = ssh.exec_command("free -m | grep Mem")
        mem_info = stdout.read().decode().strip().split()
        total_mem = float(mem_info[1])         
        used_mem = float(mem_info[2])          
        free_mem = float(mem_info[3])          
        available_mem = float(mem_info[6])     

        # Диск
        stdin, stdout, stderr = ssh.exec_command("df -m / | tail -1")
        disk_info = stdout.read().decode().strip().split()
        total_disk = float(disk_info[1])       
        used_disk = float(disk_info[2])        
        available_disk = float(disk_info[3])   
        disk_usage_percent = float(disk_info[4].rstrip('%')) 

        # температура CPU
        stdin, stdout, stderr = ssh.exec_command("cat /sys/class/thermal/thermal_zone0/temp")
        temp_raw = stdout.read().decode().strip()
        current_app.logger.info(f"Пароль сервер {temp_raw} ")

        try:
            cpu_temp = int(temp_raw) / 1000
        except:
            pass

        # Пропускная способность (в байтах)
        stdin, stdout, stderr = ssh.exec_command("cat /proc/net/dev")
        net_data = stdout.read().decode()
        rx_bytes = 0
        tx_bytes = 0
        for line in net_data.splitlines():
            if "eth0" in line or "ens3" in line:
                parts = line.split()
                rx_bytes = float(parts[1])
                tx_bytes = float(parts[9])
                break

        ssh.close()

        result = {
            "cpu_load": cpu_load,
            "cpu_model": cpu_model,
            "cpu_cores": cpu_cores,
            "cpu_freq": cpu_freq,
            "cpu_status": "Нормальная нагрузка" if cpu_load < 60 else "Высокая нагрузка",

            "memmory_total": total_mem,
            "memmory_used": used_mem,
            "memory_free": free_mem,
            "memory_available": available_mem,
            "memory_status": "Память в норме" if used_mem/total_mem*100 < 60 else "Мало доступной памяти",

            "disk_total": total_disk,
            "disk_used": used_disk,
            "disk_available": available_disk,
            "disk_usage_percent": disk_usage_percent,
            "disk_status": "Диск в норме" if disk_usage_percent < 80 else "Высокая загрузка диска",

            "network_received": rx_bytes,
            "network_transmitted": tx_bytes
        }

        return result

    @staticmethod
    def start_snmp_check(device,username,password):
        host = device
        sys_info = SNMPCheck.get_sysinfo_ssh_with_password(host, username, password)
        return sys_info
    


