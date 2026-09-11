package users

type User struct {
	Username string   `json:"username"`
	UID      string   `json:"uid"`
	Roles    []string `json:"roles"`
}
