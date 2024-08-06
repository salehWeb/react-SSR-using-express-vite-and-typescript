package main

import (
	"math"
	"testing"
)

func TestGetNewDimensions(t *testing.T) {
	tests := []struct {
		w, h, WTHR     float32
		expectedWidth  float32
		expectedHeight float32
	}{
		{100, 100, 1.0, 100, 100},
		{200, 100, 2.0, 200, 100},
		{100, 200, 0.5, 100, 200},
		{300, 100, 1.5, 150, 100},
		{100, 300, 0.5, 100, 200},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			gotW, gotH := getNewDimensions(tt.w, tt.h, tt.WTHR)
			if !almostEqual(gotW, tt.expectedWidth) || !almostEqual(gotH, tt.expectedHeight) {
				t.Errorf("getNewDimensions(%v, %v, %v) = %v, %v; want %v, %v",
					tt.w, tt.h, tt.WTHR, gotW, gotH, tt.expectedWidth, tt.expectedHeight)
			}
		})
	}
}

func almostEqual(a, b float32) bool {
	return math.Abs(float64(a-b)) < 1e-5
}
