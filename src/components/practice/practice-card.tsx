import {type Practice} from '@prisma/client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {Badge} from '@/components/ui/badge';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {ChevronsUpDown} from 'lucide-react';

export function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>
          {practice.type.name} практика
          <Badge variant='outline' className='ml-2'>{practice.status}</Badge>
        </CardTitle>
        <CardDescription>{format(practice.start_date, 'PPP', {locale: ru})} &mdash; {format(practice.end_date, 'PPP', {locale: ru})}</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger className='text-muted-foreground'>Введенная информация <ChevronsUpDown className='h-4 w-4 inline ml-2' /></CollapsibleTrigger>
          <CollapsibleContent className='truncate'>
            {JSON.stringify(practice)}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  );
}
