package keycloak

import (
	"fmt"

	"github.com/mobn0/filestore/utilities/environment"
	"github.com/mobn0/keygonomics"
)

func New() *keygonomics.Client {
	kc, err := keygonomics.New(keygonomics.Config{
		Issuer:       fmt.Sprintf("http://keycloak:8080/realms/%s", environment.KeycloakRealm.GetValue()),
		ClientID:     environment.KeycloakClientID.GetValue(),
		ClientSecret: environment.KeycloakClientSecret.GetValue(),
	})

	if err != nil {
		panic(fmt.Sprintf("Unable to connect to Keycloak: %s", err.Error()))
	}

	return kc
}
