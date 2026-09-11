package roles

import "fmt"

type Role string

func (role Role) Role() string {
	return fmt.Sprintf("ROLE_%s", role)
}

const (
	Poster Role = "poster"
)
