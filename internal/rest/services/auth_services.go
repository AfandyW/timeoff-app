package services

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hepihr/timeoff-app/internal/rest/utils"
	"net/http"
)

func RefreshToken(c *fiber.Ctx) error {
	if !utils.CheckIsTokenValid(c) {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid token",
			"data":    nil,
		})
	}

	user, err := utils.DecodeToken(c)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Error decoding token",
			"data":    nil,
		})
	}

	token, err := utils.EncodeToken(user.UUID)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Unable to generate token",
			"data":    nil,
		})
	}

	return utils.Response(c, http.StatusOK, "Token Refreshed", map[string]interface{}{"token": token})
}
