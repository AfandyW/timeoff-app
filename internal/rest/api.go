package rest

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hepihr/timeoff-app/internal/rest/handlers"
	"net/http"
)

func API(app *fiber.App) {
	handlers.AuthHandler(app)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(http.StatusNotFound)
	})
}
