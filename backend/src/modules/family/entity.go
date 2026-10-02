package family

type CreateFamilyRequest struct {
	Name string `json:"name" binding:"required" validate:"create-family-name"`
}

type CreateFamilyResponse struct {
	Message string `json:"message"`
}
