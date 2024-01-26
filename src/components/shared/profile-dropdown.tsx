"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type {User} from "@/server/types";
import {Button} from "@/components/ui/button";

export const ProfileDropdown = ({ user }: { user: User }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<span>{user.display_name}</span>
					<Avatar className="ml-2 w-8 h-8">
						<AvatarImage src={user.image} alt="Фото профиля" />
						<AvatarFallback>{user.display_name.split(" ").map(str => str.charAt(0)).join('')}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{
					user.username && user.username != '[hidden]' && <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
				}
				<DropdownMenuSeparator />
				<Link href="/student/profile">
					<DropdownMenuItem>Профиль</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					onClick={() => signOut()}
				>
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
