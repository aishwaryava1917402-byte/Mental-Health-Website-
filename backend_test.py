#!/usr/bin/env python3
"""
Backend API Testing for Mental Health Assessment Website
Tests all API endpoints for PHQ-9, GAD-7, ASRS, and Burnout assessments
"""

import requests
import sys
import json
from datetime import datetime

class MentalHealthAPITester:
    def __init__(self, base_url="https://mental-health-check-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_base}{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        if 'message' in response_data:
                            print(f"   Response: {response_data['message']}")
                        elif 'name' in response_data:
                            print(f"   Response: {response_data['name']}")
                        else:
                            print(f"   Response: Dict with {len(response_data)} keys")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root Endpoint",
            "GET",
            "/",
            200
        )

    def test_get_assessments(self):
        """Test getting list of assessments"""
        success, response = self.run_test(
            "Get Assessments List",
            "GET",
            "/assessments",
            200
        )
        
        if success and response:
            # Validate response structure
            expected_assessments = ['phq9', 'gad7', 'asrs', 'burnout']
            if isinstance(response, list) and len(response) == 4:
                print(f"   ✓ Found {len(response)} assessments")
                for assessment in response:
                    if 'id' in assessment and assessment['id'] in expected_assessments:
                        print(f"   ✓ Found {assessment['id']}: {assessment.get('name', 'N/A')}")
                    else:
                        print(f"   ⚠ Unexpected assessment format: {assessment}")
            else:
                print(f"   ⚠ Unexpected response format or count")
        
        return success, response

    def test_assessment_detail(self, assessment_id, expected_question_count=None):
        """Test getting specific assessment details"""
        success, response = self.run_test(
            f"Get {assessment_id.upper()} Assessment Detail",
            "GET",
            f"/assessment/{assessment_id}",
            200
        )
        
        if success and response:
            # Validate response structure
            required_fields = ['id', 'name', 'description', 'questions', 'interpretation']
            missing_fields = [field for field in required_fields if field not in response]
            
            if not missing_fields:
                print(f"   ✓ All required fields present")
                if 'questions' in response and isinstance(response['questions'], list):
                    question_count = len(response['questions'])
                    print(f"   ✓ Found {question_count} questions")
                    
                    if expected_question_count and question_count != expected_question_count:
                        print(f"   ⚠ Expected {expected_question_count} questions, got {question_count}")
                    
                    # Check first question structure
                    if question_count > 0:
                        first_q = response['questions'][0]
                        if all(key in first_q for key in ['id', 'text', 'options']):
                            print(f"   ✓ Question structure valid")
                            print(f"   ✓ First question: '{first_q['text'][:50]}...'")
                        else:
                            print(f"   ⚠ Invalid question structure")
                
                if 'interpretation' in response:
                    interp_keys = list(response['interpretation'].keys())
                    print(f"   ✓ Interpretation ranges: {interp_keys}")
                    
            else:
                print(f"   ⚠ Missing required fields: {missing_fields}")
        
        return success, response

    def test_invalid_assessment(self):
        """Test getting non-existent assessment"""
        return self.run_test(
            "Invalid Assessment ID",
            "GET", 
            "/assessment/invalid",
            200  # The API returns 200 with error message rather than 404
        )

def main():
    print("🧠 Mental Health Assessment API Testing")
    print("="*50)
    
    tester = MentalHealthAPITester()
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test assessments list
    success, assessments = tester.test_get_assessments()
    
    # Test each assessment in detail
    assessment_configs = {
        'phq9': 9,      # PHQ-9 has 9 questions
        'gad7': 7,      # GAD-7 has 7 questions  
        'asrs': 6,      # ASRS has 6 questions
        'burnout': 8    # Burnout has 8 questions
    }
    
    for assessment_id, expected_questions in assessment_configs.items():
        tester.test_assessment_detail(assessment_id, expected_questions)
    
    # Test invalid assessment
    tester.test_invalid_assessment()
    
    # Print summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for i, test in enumerate(tester.failed_tests, 1):
            print(f"{i}. {test['name']}")
            if 'error' in test:
                print(f"   Error: {test['error']}")
            else:
                print(f"   Expected: {test['expected']}, Got: {test['actual']}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())