import { Construction } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

export function NotImplementedAlert() {
  return (
    <Alert>
      <Construction className="h-4 w-4" />
      <AlertTitle>Здесь пусто!</AlertTitle>
      <AlertDescription>
				Пока данный функционал ещё не реализован, но кто-то над ним определенно работает
      </AlertDescription>
    </Alert>
  );
}
