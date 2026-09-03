package user

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func Setup(controller *gin.RouterGroup) {
	validate := validator.New()

}
