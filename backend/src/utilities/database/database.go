package database

import (
	"fmt"

	"github.com/mobn0/filestore/modules/family"
	"github.com/mobn0/filestore/modules/msgboard"
	"github.com/mobn0/filestore/utilities/environment"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Setup() *gorm.DB {

	pg_dsn := fmt.Sprintf("host=db user=%s password=%s dbname=%s port=5432 sslmode=disable", environment.DBUser.GetValue(), environment.DBPassword.GetValue(), environment.DBDB.GetValue())
	db, err := gorm.Open(postgres.Open(pg_dsn))
	if err != nil {
		panic("Unable to connect to database!")
	}

	msgboard.SetupModels(db)
	family.SetupModels(db)

	return db
}
