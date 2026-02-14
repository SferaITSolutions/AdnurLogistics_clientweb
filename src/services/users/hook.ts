'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import usersService from "./users.service"

export const useUsers = (data: {
    page: any;
    size: any;
    phone: any;
    client: any;
    entityId: any;
}) => {
    return useQuery({
        queryKey: ['users', data],
        queryFn: () => usersService.getUsers(data),
    })
}
export const useEntityIds = () => {
    return useQuery({
        queryKey: ['entityIds'],
        queryFn: () => usersService.getEntityIds(),
    })
}
export const useExcel = () => {
    return useQuery({
        queryKey: ['Excel'],
        queryFn: () => usersService.getExcel(),
        enabled: false,
    })
}
export const useUpdateUserEntity = (userId: any,) => {
    return useMutation({
        mutationFn: () => usersService.updateusetsEntity(userId),
    })
}
