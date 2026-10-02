package family

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/mobn0/filestore/utilities/response"
	"github.com/mobn0/keygonomics"
	"gorm.io/gorm"
)

func Setup(controller *gin.RouterGroup) {

	validate := validator.New()
	validate.RegisterValidation("create-family-name", ValidateCreateFamilyName)

	controller.POST("/create_family", func(ctx *gin.Context) {
		db := ctx.MustGet("db").(*gorm.DB)

		claims, err := keygonomics.GetClaims(ctx)
		if err != nil {
			response.Fail(ctx, http.StatusInternalServerError, err.Error())
		}

		var request CreateFamilyRequest

		err = ctx.ShouldBindBodyWithJSON(&request)
		if err != nil {
			response.Fail(ctx, http.StatusBadRequest, err.Error())
			return
		}

		err = validate.Struct(request)
		if err != nil {
			response.Fail(ctx, http.StatusBadRequest, err.Error())
			return
		}

		res, err := CreateFamily(request, db, claims)
		if err != nil {
			response.Fail(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(ctx, res)

	})

}
