package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/hepihr/timeoff-app/internal/rest"
	"github.com/hepihr/timeoff-app/internal/rest/utils"
)

func main() {
	app := fiber.New()

	app.Get("/ping", func(c *fiber.Ctx) error {

		return utils.Response(c, 200, "Pong", nil)
	})

	rest.API(app)

	log.Fatal(app.Listen(":3000"))
}
