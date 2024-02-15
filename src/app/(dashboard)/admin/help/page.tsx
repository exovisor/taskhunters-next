import { type Metadata } from 'next';
import { PageHeading } from '@/components/page-headings/default-page-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Помощь',
  description: 'Помощь администраторам',
};

export default function StudentHelp() {
  return (
    <>
      <PageHeading title={'Помощь'} />
      <div className='p-4'>
        <div className='my-4'>
          <Alert>
            <p>
              Данная страница находится в разработке.
              <br />
              Информация носит демонстрационный характер
            </p>
          </Alert>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='telegram-id'>
            <AccordionTrigger>Как узнать Telegram ID?</AccordionTrigger>
            <AccordionContent>
              <ul className='list-disc'>
                <li>
                  Запустите Telegram и в поиске введите{' '}
                  <a
                    href='https://t.me/getmyid_bot'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:underline'
                  >
                    <code>@getmyid_bot</code>
                  </a>
                </li>
                <li>Нажмите кнопку /start</li>
                <li>Перейдите в общий или личный чат с пользователем</li>
                <li>
                  Выберите любое сообщение от пользователя и перешлите его
                  указанному боту. В поле <code>Forwarded from</code> вы увидите
                  ID пользователя.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
