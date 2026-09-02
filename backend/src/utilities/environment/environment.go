package environment

import "os"

type EnvKey string

func (key EnvKey) GetValue() string {
	return os.Getenv(string(key))
}

const (
	DBUser     EnvKey = "POSTGRES_USER"
	DBPassword EnvKey = "POSTGRES_PASSWORD"
	DBDB       EnvKey = "POSTGRES_DB"
)
