export interface NewUserDto {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface UserInfo {
	login: string;
	password: string;
}

export interface UserDto {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
}

export interface EditUserDto {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
}

export interface PasswordDto {
	newPassword: string;
	oldPassword: string;
}
