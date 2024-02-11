
export const status = [
  {
    value: 'UNVERIFIED',
    label: 'На проверке'
  },
  {
    value: 'VERIFIED',
    label: 'Подтверждено'
  },
  {
    value: 'REJECTED',
    label: 'Отклонено'
  },
  {
    value: 'REPORT_PENDING',
    label: 'Отчет на проверке'
  },
  {
    value: 'REPORT_REJECTED',
    label: 'Отчет отклонен'
  },
  {
    value: 'COMPLETED',
    label: 'Завершено'
  }
];

export function getStatusByValue(value: string) {
  return status.find((status) => status.value === value);
}
