package aphamale.project.appointment.Dto;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import aphamale.project.appointment.Domain.UserInfoDomain;

public class CustomUserDetails implements UserDetails{

    private final UserInfoDomain userInfoDomain;

    public CustomUserDetails(UserInfoDomain userInfoDomain){
        this.userInfoDomain = userInfoDomain;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority(){
                return userInfoDomain.getJwtRole();
            }
        });   

        return collection;
    }

    @Override
    public String getPassword() {

        return userInfoDomain.getUserPw();

        //throw new UnsupportedOperationException("Unimplemented method 'getPassword'");
    }

    @Override
    public String getUsername() {
        
        return userInfoDomain.getUserId();
        
        //throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
    }
    
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/front_y
