package aphamale.project.appointment.Dto;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import aphamale.project.appointment.Domain.HospitalInfoDomain;

public class CustomAdminUserDetails implements UserDetails{

    private final HospitalInfoDomain hospitalInfoDomain;

    public CustomAdminUserDetails(HospitalInfoDomain hospitalInfoDomain){
        this.hospitalInfoDomain = hospitalInfoDomain;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority(){
                return hospitalInfoDomain.getJwtRole();
            }
        });   

        return collection;
    }

    @Override
    public String getPassword() {

        return hospitalInfoDomain.getHospitalPw();

        //throw new UnsupportedOperationException("Unimplemented method 'getPassword'");
    }

    @Override
    public String getUsername() {
        
        return hospitalInfoDomain.getHospitalId();
        
        //throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
    }
    
}