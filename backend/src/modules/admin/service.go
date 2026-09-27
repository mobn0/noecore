package admin

import (
	"github.com/gin-gonic/gin"
	"github.com/mobn0/filestore/utilities/roles"
	"github.com/mobn0/filestore/utilities/users"
	"github.com/mobn0/keygonomics"
)

func GetUsers(kc *keygonomics.Client, c *gin.Context) ([]users.User, error) {
	rawUsers, err := kc.ListUsers(c)

	if err != nil {
		return []users.User{}, err
	}

	var reutrnUsers []users.User
	for _, u := range rawUsers {
		reutrnUsers = append(reutrnUsers, users.User{Username: u.Username, UID: u.ID, Roles: roles.NewFromSlice(u.RealmRoles)})
	}

	return reutrnUsers, nil
}

func GetRoles() []roles.Role {
	return roles.Roles()
}

func AddRole(req AddRoleRequest, kc *keygonomics.Client, c *gin.Context) error {
	return kc.AssignRealmRole(c, req.UserUUID, req.Role.Role())
}

func RemoveRole(req RemoveRoleRequest, kc *keygonomics.Client, c *gin.Context) error {
	return kc.RemoveRealmRole(c, req.UserUUID, req.Role.Role())
}
