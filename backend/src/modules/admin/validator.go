package admin

import "github.com/go-playground/validator/v10"

func ValidateAddRoleUserUUID(field validator.FieldLevel) bool {
	fieldString := field.Field().String()
	if len([]rune(fieldString)) < 1 {
		return false
	}
	return true
}

func ValidateAddRoleRole(field validator.FieldLevel) bool {
	fieldString := field.Field().String()
	if len([]rune(fieldString)) < 1 {
		return false
	}
	return true
}

func ValidateRemoveRoleUserUUID(field validator.FieldLevel) bool {
	fieldString := field.Field().String()
	if len([]rune(fieldString)) < 1 {
		return false
	}
	return true
}

func ValidateRemoveRoleRole(field validator.FieldLevel) bool {
	fieldString := field.Field().String()
	if len([]rune(fieldString)) < 1 {
		return false
	}
	return true
}
