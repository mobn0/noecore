package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mobn0/filestore/modules/admin"
	"github.com/mobn0/filestore/modules/msgboard"
	"github.com/mobn0/filestore/utilities/database"
	"github.com/mobn0/filestore/utilities/keycloak"
	"github.com/mobn0/keygonomics"
)

func main() {
	db := database.Setup()
	kc := keycloak.New()

	engine := gin.New()

	engine.Use(gin.Recovery(), gin.Logger())
	engine.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"authorization", "content-type"},
	}))
	engine.Use(database.DatabaseMiddleware(db))
	engine.Use(keygonomics.RequireAuth(kc))
	engine.Use(keycloak.KeycloakMiddleware(kc))

	msgboard.Setup(engine.Group("/msgboard"))
	admin.Setup(engine.Group("/admin"))

	engine.Run(":8080")

}
