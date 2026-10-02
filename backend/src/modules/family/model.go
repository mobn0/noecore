package family

import (
	"uuid"

	"gorm.io/gorm"
)

type DBFamily struct {
	gorm.Model
	Owner   uuid.UUID `gorm:"type:uuid"`
	Name    string
	Members []DBFamilyMember
}

type DBFamilyMember struct {
	gorm.Model
	DBFamilyID uint
	Name       string
	UUID       uuid.UUID `gorm:"type:uuid"`
}

func SetupModels(db *gorm.DB) {

	db.AutoMigrate(&DBFamily{})
	db.AutoMigrate(&DBFamilyMember{})

}
