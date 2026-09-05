package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mobn0/filestore/modules/msgboard"
	"github.com/mobn0/filestore/utilities/database"
)

func main() {
	db := database.Setup()

	engine := gin.New()
	engine.Use(gin.Recovery(), gin.Logger())
	engine.Use(cors.Default())
	engine.Use(database.DatabaseMiddleware(db))

	msgboard.Setup(engine.Group("/msgboard"))

	engine.Run(":8080")

}
