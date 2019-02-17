from django.utils.crypto import get_random_string
chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
SECRET_KEY = get_random_string(50, chars)
print("insert \nSECRET_KEY=\"{}\"\nto settings.py".format(SECRET_KEY))



