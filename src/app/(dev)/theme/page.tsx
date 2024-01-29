import {Showcase} from "@/components/internal/showcase";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import {ThemeToggle} from "@/components/theme/theme-toggle";
import SignOut from "@/components/auth/sign-out";

export default async function InternalPage() {
	return (
		<div className="flex flex-col gap-4 p-6">
			<div className='flex gap-2'>
				<ThemeToggle/>
				<SignOut/>
			</div>
			<Showcase hint="Типография">
				<h1>Заголовок 1</h1>
				<h2>Заголовок 2</h2>
				<p>Основной текст</p>
			</Showcase>
			<Showcase hint="Кнопки">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="destructive">Destructive</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="link">Link</Button>
				<Button disabled>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</Button>
			</Showcase>
			<Showcase hint="Поля ввода">
				<Input type="email" placeholder="Email" />
				<Input disabled type="email" placeholder="Disabled" />
			</Showcase>
			<Showcase hint="Боковая панель">
				<Sheet>
					<SheetTrigger asChild><Button variant="outline">Открыть</Button></SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Are you absolutely sure?</SheetTitle>
							<SheetDescription>
								This action cannot be undone. This will permanently delete your account
								and remove your data from our servers.
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</Showcase>
		</div>
	);
}
