package family

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

func ValidateCreateFamilyName(field validator.FieldLevel) bool {
	name := strings.TrimSpace(field.Field().String())
	length := len([]rune(name))

	if length < 1 {
		return false
	}

	if length > 25 {
		return false
	}

	return true
}
