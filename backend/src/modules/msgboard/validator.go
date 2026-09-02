package msgboard

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

func ValidatePingPinger(field validator.FieldLevel) bool {
	return field.Field().String() == "ping"
}

func ValidatePostPost(field validator.FieldLevel) bool {
	msg := strings.TrimSpace(field.Field().String())

	length := len([]rune(msg))

	if length < 1 {
		return false
	}

	if length > 150 {
		return false
	}

	return true

}
