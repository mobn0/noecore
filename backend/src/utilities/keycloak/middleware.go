package keycloak

import (
	"github.com/gin-gonic/gin"
	"github.com/mobn0/keygonomics"
)

func KeycloakMiddleware(kc *keygonomics.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("kc", kc)
		c.Next()
	}
}
