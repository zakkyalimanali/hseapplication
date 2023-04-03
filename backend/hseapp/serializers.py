from rest_framework import serializers
from .models import Staff , Incident
# from .models import Staff

class StaffSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.position = validated_data.get('position', instance.position)
    #     instance.staff_id_number = validated_data.get('staff_id_number', instance.position)
    #     instance.save()
    #     return instance

    

class IncidentSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(IncidentSeriallizer, self).to_representation(instance)
        rep['name'] = instance.raised_by.staff_id_number
        return rep