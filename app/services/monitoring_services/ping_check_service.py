from ping3 import ping
import statistics


class PingCheck:
    @staticmethod
    def diagnostics(host: str, count: int, timeout: int = 2):
        latencies = []
        for i in range(1, count + 1):
            result = ping(host, timeout=timeout, unit='ms')
            if result is not None:
                latencies.append(result)
            else:
                pass

        success = len(latencies)
        loss = count - success

        if latencies and all(latency == 0 for latency in latencies):
            return  {
            "packet_loss": None,                
            "ping_avg": None,                   
            "ping_min": None,                  
            "ping_max": None,                   
            "ping_status": "Недоступно"         
        }

        if success > 6:
            status = "Работает"
        elif success > 3 and success < 7:
            status = "Предупреждение"
        elif 0 < success < 4:
            status = "Критическое состояние"
        else:
            status = "Недоступно"

        result = {
            "packet_loss": (loss / count) * 100,                              # Процент потерь
            "ping_avg": statistics.mean(latencies) if latencies else None,    # Средняя задержка
            "ping_min": min(latencies) if latencies else None,                # Минимальная задержка
            "ping_max": max(latencies) if latencies else None,                # Максимальная задержка
            "ping_status": status                                             # Статус
        }

        return result
