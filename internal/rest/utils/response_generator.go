package utils

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
)

func Response(c *fiber.Ctx, statusCode int, message string, data interface{}) error {
	switch v := data.(type) {
	case nil:
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
		})
	case map[string]interface{}:
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    v,
		})
	case []map[string]interface{}:
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    v,
		})
	case []interface{}:
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    v,
		})
	case float64, int64, int, float32, int32, uint, uint32, uint64:
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    v,
		})
	case string:
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    v,
		})
	default:
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Invalid data provided",
			"status":  http.StatusInternalServerError,
		})
	}
}
