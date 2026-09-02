package msgboard

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/mobn0/filestore/utilities/response"
	"gorm.io/gorm"
)

func Setup(controller *gin.RouterGroup) {
	validate := validator.New()
	validate.RegisterValidation("ping-pinger", ValidatePingPinger)
	validate.RegisterValidation("post-post", ValidatePostPost)

	controller.GET("/ping", func(c *gin.Context) {
		var request PingRequest

		err := c.ShouldBindJSON(&request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err = validate.Struct(request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		res := Ping(request)
		response.OK(c, res)
		return
	})

	controller.POST("/post", func(c *gin.Context) {
		db := c.MustGet("db").(*gorm.DB)
		var request PostRequest

		err := c.ShouldBindJSON(&request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err = validate.Struct(request)
		if err != nil {
			response.Fail(c, http.StatusBadRequest, err.Error())
			return
		}

		err, res := Post(request, db)
		if err != nil {
			response.Fail(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(c, res)
		return

	})

	controller.POST("/get_posts", func(c *gin.Context) {
		db := c.MustGet("db").(*gorm.DB)

		err, res := GetPosts(db)
		if err != nil {
			response.Fail(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.OK(c, res)
		return
	})
}
