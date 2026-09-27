package roles

import (
	"errors"
	"fmt"
	"strings"
)

type Role string

func (role Role) Role() string {
	return fmt.Sprintf("ROLE_%s", role)
}

func NewFormated(formatedRole string) (Role, error) {
	for _, role := range Roles() {
		if role == Role(formatedRole) {
			return role, nil
		}
	}

	return "", errors.New("Invalid Role!")
}

func New(rawRole string) (Role, error) {
	cleanedRole, hasPrefix := strings.CutPrefix(rawRole, "ROLE_")
	if !hasPrefix {
		return "", errors.New("Invalid Role!")
	}

	return NewFormated(cleanedRole)
}

func NewFromSlice(rawRoles []string) []Role {
	var formatedRoles []Role

	for _, rawRole := range rawRoles {
		role, err := New(rawRole)
		if err != nil {
			continue
		}
		formatedRoles = append(formatedRoles, role)
	}
	return formatedRoles
}

const (
	Poster Role = "poster"
	Admin  Role = "admin"
)

func Roles() []Role {
	return []Role{Poster, Admin}
}
