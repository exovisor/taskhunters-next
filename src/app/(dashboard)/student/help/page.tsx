import { type Metadata } from 'next';
import { PageHeading } from '@/components/page-headings/default-page-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Помощь',
  description: 'Помощь студентам',
};

export default function StudentHelp() {
  return (
    <>
      <PageHeading title={'Помощь'} />
      <div className='p-4'>
        <div className='my-4'>
          <Alert>
            <p>Данная страница находится в разработке.<br/>Информация носит демонстрационный характер</p>
          </Alert>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='registration'>
            <AccordionTrigger>Как мне зарегистрироваться на практику?</AccordionTrigger>
            <AccordionContent>
              Для регистрации на практику вам необходимо заполнить свой профиль на данном портале,
              а также подать заявку на практику в разделе &quot;Практики&quot;.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='assignment'>
            <AccordionTrigger>Откуда взять направление на практику?</AccordionTrigger>
            <AccordionContent>
              Направление на практику выдает ваше учебное заведение.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='schedule'>
            <AccordionTrigger>В какой форме проходит практика?</AccordionTrigger>
            <AccordionContent>
              <span className='block'>
                Практика может проходить в различных формах, в зависимости от ваших задач.<br/>
                В основном это дистанционный формат, но по требованию руководителя вы можете быть вызваны в офис.
              </span>
              <span className='block mt-2'>
                Если вы собираетесь уехать из города или у вас есть уважительная причина для прохождения практики
                полностью дистанционно - необходимо заранее согласовать это с вашим руководителем практики.
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='bugs'>
            <AccordionTrigger>Я столкнулся с проблемой, что делать?</AccordionTrigger>
            <AccordionContent>
              Если у вас возникли проблемы с работой портала, обратитесь в техническую поддержку.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='other'>
            <AccordionTrigger>Моей проблемы/вопроса тут нет, куда писать?</AccordionTrigger>
            <AccordionContent>
              Если вы не нашли ответ на свой вопрос, вы всегда можете написать в Telegram-чат вашей группы
              или обратиться к своему руководителю.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
