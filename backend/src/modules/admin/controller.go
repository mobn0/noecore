package admin

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/mobn0/filestore/utilities/response"
	"github.com/mobn0/filestore/utilities/roles"
	"github.com/mobn0/keygonomics"
)

func Setup(controller *gin.RouterGroup) {
	controller.Use(keygonomics.RequireRealmRole(roles.Admin.Role()))

	validate := validator.New()

	validate.RegisterValidation("add-role-user-uuid", ValidateAddRoleUserUUID)
	validate.RegisterValidation("add-role-role", ValidateAddRoleRole)

	validate.RegisterValidation("remove-role-user-uuid", ValidateRemoveRoleUserUUID)
	validate.RegisterValidation("remove-role-role", ValidateRemoveRoleRole)

	controller.POST("/get_users", func(c *gin.Context) {
		kc := c.MustGet("kc").(*keygonomics.Client)

		res, err := GetUsers(kc, c)
		if err != nil {
			response.Fail(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(c, GetUsersResponse{Users: res})
	})

	controller.POST("/get_roles", func(c *gin.Context) {
		res := GetRoles()
		response.OK(c, GetRolesResponse{Roles: res})
	})

	controller.POST("add_role", func(c *gin.Context) {
		kc := c.MustGet("kc").(*keygonomics.Client)

		var request AddRoleRequest

		err := c.ShouldBindBodyWithJSON(&request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err = validate.Struct(request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err = AddRole(request, kc, c)
		if err != nil {
			response.Fail(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(c, AddRoleResponse{"Successful"})
	})

	controller.POST("remove_role", func(c *gin.Context) {
		kc := c.MustGet("kc").(*keygonomics.Client)

		var request RemoveRoleRequest

		err := c.ShouldBindBodyWithJSON(&request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err = validate.Struct(request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err = RemoveRole(request, kc, c)
		if err != nil {
			response.Fail(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(c, AddRoleResponse{"Successful"})
	})
}
