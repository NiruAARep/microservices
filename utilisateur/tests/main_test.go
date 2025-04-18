package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func mockLoadUsers() {
	users = []User{
		{ID: 1, Name: "Alice", Email: "alice@example.com"},
		{ID: 2, Name: "Bob", Email: "bob@example.com"},
	}
}

func TestGetAllUsers(t *testing.T) {
	mockLoadUsers()

	req := httptest.NewRequest(http.MethodGet, "/users", nil)
	w := httptest.NewRecorder()

	getAllUsers(w, req)

	resp := w.Result()
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, resp.StatusCode)
	}

	var responseUsers []User
	if err := json.NewDecoder(resp.Body).Decode(&responseUsers); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	if len(responseUsers) != len(users) {
		t.Errorf("Expected %d users, got %d", len(users), len(responseUsers))
	}
}

func TestGetUserByID(t *testing.T) {
	mockLoadUsers()

	tests := []struct {
		id           string
		expectedCode int
		expectedName string
	}{
		{"1", http.StatusOK, "Alice"},
		{"2", http.StatusOK, "Bob"},
		{"999", http.StatusNotFound, ""},
		{"abc", http.StatusBadRequest, ""},
	}

	for _, test := range tests {
		req := httptest.NewRequest(http.MethodGet, "/users/"+test.id, nil)
		w := httptest.NewRecorder()

		getUserByID(w, req)

		resp := w.Result()
		defer resp.Body.Close()

		if resp.StatusCode != test.expectedCode {
			t.Errorf("For ID %s, expected status %d, got %d", test.id, test.expectedCode, resp.StatusCode)
		}

		if test.expectedCode == http.StatusOK {
			var user User
			if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
				t.Fatalf("Failed to decode response for ID %s: %v", test.id, err)
			}
			if user.Name != test.expectedName {
				t.Errorf("For ID %s, expected name %s, got %s", test.id, test.expectedName, user.Name)
			}
		}
	}
}