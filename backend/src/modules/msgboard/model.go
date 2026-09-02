package msgboard

import (
	"gorm.io/gorm"
)

type DBMessage struct {
	gorm.Model
	Message string `gorm:"uniqueIndex"`
}

func SetupModels(db *gorm.DB) {

	db.AutoMigrate(&DBMessage{})

}
