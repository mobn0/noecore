package family

import (
	"context"
	"uuid"

	"github.com/mobn0/keygonomics"
	"gorm.io/gorm"
)

func CreateFamily(request CreateFamilyRequest, db *gorm.DB, claims *keygonomics.Claims) (CreateFamilyResponse, error) {
	ctx := context.Background()

	parsedUUID, err := uuid.Parse(claims.ID)
	if err != nil {
		return CreateFamilyResponse{Message: ""}, err
	}

	newFamily := DBFamily{Owner: parsedUUID, Members: []DBFamilyMember{}}

	err = gorm.G[DBFamily](db).Create(ctx, &newFamily)
	if err != nil {
		return CreateFamilyResponse{Message: ""}, err
	}

	return CreateFamilyResponse{Message: "Successfull!"}, nil

}
