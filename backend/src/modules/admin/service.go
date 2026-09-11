package admin

import (
	"github.com/gin-gonic/gin"
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
		reutrnUsers = append(reutrnUsers, users.User{Username: u.Username, UID: u.ID, Roles: u.RealmRoles})
	}

	return reutrnUsers, nil

}
