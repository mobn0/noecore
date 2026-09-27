package admin

import (
	"github.com/mobn0/filestore/utilities/roles"
	"github.com/mobn0/filestore/utilities/users"
)

type GetUsersResponse struct {
	Users []users.User `json:"users"`
}

type GetRolesResponse struct {
	Roles []roles.Role `json:"roles"`
}

type AddRoleRequest struct {
	UserUUID string     `json:"user_uuid" binding:"required" validate:"add-role-user-uuid"`
	Role     roles.Role `json:"role" binding:"required" validate:"add-role-role"`
}
type AddRoleResponse struct {
	Message string `json:"message"`
}

type RemoveRoleRequest struct {
	UserUUID string     `json:"user_uuid" binding:"required" validate:"remove-role-user-uuid"`
	Role     roles.Role `json:"role" binding:"required" validate:"remove-role-role"`
}
type RemoveRoleResponse struct {
	Message string `json:"message"`
}
