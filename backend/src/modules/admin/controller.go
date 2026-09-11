package admin

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mobn0/filestore/utilities/response"
	"github.com/mobn0/filestore/utilities/roles"
	"github.com/mobn0/keygonomics"
)

func Setup(controller *gin.RouterGroup) {
	controller.Use(keygonomics.RequireRealmRole(roles.Admin.Role()))

	controller.POST("/get_users", func(c *gin.Context) {
		kc := c.MustGet("kc").(*keygonomics.Client)

		res, err := GetUsers(kc, c)
		if err != nil {
			response.Fail(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(c, GetUsersResponse{Users: res})

	})

}
