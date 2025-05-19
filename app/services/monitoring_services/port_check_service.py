import socket

class PortCheck: 
    @staticmethod
    def check_port(host, port, timeout=3):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(timeout)
        try:
            s.connect((host, port))
            s.close()
            return True
        except (socket.timeout, ConnectionRefusedError):
            return False

    @staticmethod
    def check_multiple_ports(host, ports):
        results = {}
        for port in ports:
            status = PortCheck.check_port(host, port)
            results[port] = "доступен" if status else "недоступен"
        return results

    @staticmethod
    def start_port_check(device, ports):
        return PortCheck.check_multiple_ports(device, ports)
