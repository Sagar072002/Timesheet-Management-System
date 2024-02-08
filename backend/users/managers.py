from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):

    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email"))
        
    def create_user(self, name, employeeid, gender, email, phone_number, age, address, password, **extra_fields):
        email = self.normalize_email(email)
        self.email_validator(email)

        user = self.model(
            name=name,
            employeeid=employeeid,
            gender=gender,
            email=email,
            phone_number=phone_number,
            age=age,
            address=address,
            **extra_fields
        )

        user.set_password(password)
        # Debugging output
        print(f'is_active before save: {user.is_active}')

        user.save()

        # Debugging output
        print(f'is_active after save: {user.is_active}')
        #user.save()

        return user
        
    # def create_superuser(self, name, employeeid, gender, email, phone_number, age, address, password, **extra_fields):
    #     extra_fields.setdefault("is_staff", True)
    #     extra_fields.setdefault("is_superuser", True)

    #     return self.create_user(name, employeeid, gender, email, phone_number, age, address, password, **extra_fields)    
    
    