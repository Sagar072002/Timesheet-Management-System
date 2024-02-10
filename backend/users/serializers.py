from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        
        model = User
        fields = ['id', 'name', 'employeeid', 'gender', 'email', 'phone_number', 'age', 'address', 'password']
    #     #validators = [validate_email] 
    #     extra_kwargs = {
    #         'password': {'write_only': True},
    #     }

    # def update(self, instance, validated_data):
    #     # Update password if it's provided in the data
    #     password = validated_data.get('password', None)
    #     if password:
    #         instance.set_password(password)
    #     return super().update(instance, validated_data)
