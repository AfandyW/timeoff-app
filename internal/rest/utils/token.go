package utils

import (
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/hepihr/timeoff-app/internal/domain"
	"time"
)

func helperParseToken(c *fiber.Ctx) (*jwt.Token, error) {
	tokenString := c.Get("Authorization")
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("RAHASIA"), nil
	})
}

func CheckIsTokenValid(c *fiber.Ctx) bool {
	token, err := helperParseToken(c)

	if err != nil {
		return false
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return false
	}
	return true
}

func DecodeToken(c *fiber.Ctx) (domain.User, error) {
	token, err := helperParseToken(c)
	if err != nil {
		return domain.User{}, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		userId, ok := claims["user_id"].(uint64)
		if !ok {
			return domain.User{}, errors.New("unable to assert user_id from token")
		}

		user := domain.User{
			UUID: fmt.Sprint(userId),
		}

		return user, nil
	}

	return domain.User{}, err
}

func EncodeToken(userID string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 20).Unix()
	return token.SignedString([]byte("RAHASIA"))
}
