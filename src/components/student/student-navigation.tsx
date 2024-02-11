import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarDays, ClipboardList, HelpCircle, Home } from 'lucide-react';

const navigation = [
  { name: 'Главная', href: '/student', icon: Home },
  { name: 'Практики', href: '/student/practices', icon: CalendarDays },
  { name: 'Мои задания', href: '/student/tasks', icon: ClipboardList },
  { name: 'Справка', href: '/student/help', icon: HelpCircle },
];

export function StudentNavigation() {
  return (
    <div className='mt-5 flex-1 overflow-y-auto px-3'>
      <nav>
        <div className='space-y-1'>
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              passHref
              legacyBehavior
            >
              <Button variant='ghost' className='w-full justify-start'>
                <item.icon className='mr-2 h-4 w-4'/>
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
