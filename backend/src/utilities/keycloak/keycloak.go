package keycloak

import (
	"fmt"

	"github.com/mobn0/filestore/utilities/environment"
	"github.com/mobn0/keygonomics"
)

func Verifier() (*keygonomics.Verifier, error) {

	verifier, err := keygonomics.NewFromIssuer(fmt.Sprintf("http://keycloak:8080/realms/%s", environment.KeycloakRealm.GetValue()))

	if err != nil {
		return &keygonomics.Verifier{}, err
	}

	return verifier, nil
}
