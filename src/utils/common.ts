import UserType from "@/types/user";

export function fullName(user:UserType):string {
    return user.name.title + ' ' + user.name.first + ' ' + user.name.last
}

export function shortFullName(user:UserType):string {
    return user.name.first + ' ' + user.name.last
}