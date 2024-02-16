package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hepihr/timeoff-app/internal/rest/services"
)

func AuthHandler(app *fiber.App) {
	auth := app.Group("/auths")

	auth.Get("/", services.RefreshToken)
}
